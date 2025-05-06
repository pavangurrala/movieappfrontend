import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from '../../components/moviecard';
import sampleData from '../sampleData';

const meta = {
    title: 'Home Page/MovieCard',
    component: MovieCard,
} satisfies Meta<typeof MovieCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: sampleData

};
Basic.storyName = "Default";
const sampleNoPoster = { ...sampleData, poster_path: undefined };
export const Exceptional: Story = {
    args: sampleNoPoster

};
Exceptional.storyName = "Exception";