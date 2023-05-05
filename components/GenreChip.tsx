import { Genre } from "@/enums/genre";
import Chip from "./Chip";

interface GenreChipsProps {
  genres: Genre[];
  className?: string;
}

const genreColors: Record<Genre, string> = {
  [Genre.ACTION]: "bg-red-500",
  [Genre.ADVENTURE]: "bg-yellow-500",
  [Genre.COMEDY]: "bg-blue-500",
  [Genre.DRAMA]: "bg-purple-500",
  [Genre.FANTASY]: "bg-pink-500",
  [Genre.HORROR]: "bg-gray-500",
  [Genre.MYSTERY]: "bg-indigo-500",
  [Genre.ROMANCE]: "bg-green-500",
  [Genre.SCIENCE_FICTION]: "bg-teal-500",
  [Genre.SLICE_OF_LIFE]: "bg-orange-500",
  [Genre.SPORTS]: "bg-blue-700",
  [Genre.SUPERNATURAL]: "bg-indigo-700",
  [Genre.THRILLER]: "bg-green-700",
};

const defaultColor = "bg-gray-500";

function GenreChips({ genres, className }: GenreChipsProps) {
  return (
    <div className={className}>
      {genres.map((genre) => (
        <Chip key={genre} color={genreColors[genre] ?? defaultColor} label={genre} />
      ))}
    </div>
  );
}

export default GenreChips;
