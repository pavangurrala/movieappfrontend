import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../movieDetails";
import sampleData from '../../stories/sampleData';

const meta = {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args:  sampleData
};
Basic.storyName = "Default";
