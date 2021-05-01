import {Rating} from '../types/rating';
import {Laptime} from '../types/laptimes';
import {MpRaceResult, QualiResult, RaceResult} from '../types/resultData';
import {Result} from '../types/results';
import axiosInstance from './axiosInstance';
import {CancelToken} from 'axios';
import {Dispatch, SetStateAction} from 'react';

const getHashData = async (
  user: Rating,
  classId: number,
  hash: string,
  index: number,
  token: CancelToken,
): Promise<Laptime> => {
  try {
    const result: MpRaceResult = await (
      await axiosInstance(`/multiplayer/results/${hash}?json`, {
        cancelToken: token,
      })
    ).data;

    const raceResult = result.GetMpRaceResultResult.RaceResult.find(
      (driver: RaceResult) =>
        driver.UserId === user.UserId && driver.CarClass.Id === classId,
    );

    const qualiResult = result.GetMpRaceResultResult.QualiResult.find(
      (driver: QualiResult) =>
        driver.UserId === user.UserId && driver.CarClass.Id === classId,
    );

    if (raceResult !== undefined && qualiResult !== undefined) {
      const fastestLap = Math.min(
        ...[
          ...raceResult.Laps.filter(lap => lap.Valid && lap.Time !== -1000).map(
            lap => lap.Time,
          ),
          ...qualiResult.Laps.filter(
            lap => lap.Valid && lap.Time !== -1000,
          ).map(lap => lap.Time),
        ],
      );

      return {
        laptime: fastestLap,
        livery: raceResult.LiveryId.Id,
        name: raceResult.FullName,
        userId: raceResult.UserId,
      };
    }
  } catch (e) {
    console.error(
      `Hash ${index} from ${user.Fullname} failed! - ${hash} - ${e}`,
    );
  }
  return {
    laptime: -1000,
    livery: 0,
    name: '',
    userId: 0,
  };
};

const getRankedData = async (
  user: Rating,
  classId: number,
  trackId: number,
  token: CancelToken,
  setProgress: Dispatch<SetStateAction<number>>,
  index: number,
  size: number,
): Promise<Laptime> => {
  try {
    const response = await axiosInstance(`/users/${user.UserId}/career?json`, {
      cancelToken: token,
    });

    const races =
      response.data.context.c.raceList.GetUserMpRatingProgressResult.Entries;

    const hashes: string[] = races
      .filter(
        (race: Result) =>
          race.TrackLayoutId.Id === trackId &&
          race.CarClasses.find(carClass => carClass.Id === classId)?.Id ===
            classId,
      )
      .map((race: Result) => race.RaceHash);

    if (hashes.length > 0) {
      let data: Laptime[] = await Promise.all(
        hashes.map(
          async (value, index): Promise<Laptime> =>
            await getHashData(user, classId, value, index, token),
        ),
      );

      data = data.filter(result => result !== undefined);

      if (data.length > 1) {
        return data.reduce(
          (min, p) => (p.laptime < min.laptime ? p : min),
          data[0],
        );
      } else {
        return data[0];
      }
    }
  } catch (error) {
    console.error(
      `user: ${user.Fullname} - ${error.code}` ||
        `user: ${user.Fullname} - ${error.message}`,
    );
  }

  setProgress((index + 1) / size);

  return {
    laptime: -1000,
    name: '',
    livery: 0,
    userId: 0,
  };
};

const getLeaderboardData = async (
  token: CancelToken,
  classId: number,
  trackId: number,
  setProgress: Dispatch<SetStateAction<number>>,
): Promise<Laptime[]> => {
  const data: Rating[] = await (
    await axiosInstance('/multiplayer-rating/ratings.json', {
      cancelToken: token,
    })
  ).data;

  const activeUsers = data.filter(driver => driver.ActivityPoints === 5);

  return await Promise.all(
    activeUsers.map(async (user: Rating, index: number) => {
      return await getRankedData(
        user,
        classId,
        trackId,
        token,
        setProgress,
        index,
        activeUsers.length,
      );
    }),
  );
};

export default getLeaderboardData;
