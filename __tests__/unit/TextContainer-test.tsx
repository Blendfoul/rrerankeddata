import 'react-native';
import React from 'react';
import TextContainer from '../../src/components/utils/TextContainer';
import { render, RenderAPI } from '@testing-library/react-native';

describe('Text Container', () => {
  let testInstance: RenderAPI;

  beforeEach(() => {
    testInstance = render(
      <TextContainer title={'Placeholder Title'} text={'Placeholder Text'} />,
    );
  });

  it('Renders title', () => {
    const { getAllByTestId } = testInstance;
    expect(getAllByTestId('title').length).toBe(1);
  });

  it('Renders text', () => {
    const { getAllByTestId } = testInstance;
    expect(getAllByTestId('text').length).toBe(1);
  });
});
