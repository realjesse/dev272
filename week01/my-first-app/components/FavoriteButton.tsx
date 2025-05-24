import { FavouriteIcon, Icon } from "./ui/icon";
import { Pressable } from "./ui/pressable";

type FavoriteButtonProps = {
  isFavorite?: boolean;
  handleFavoriteToggle: () => void;
};

const FavoriteButton = ({
  isFavorite = false,
  handleFavoriteToggle,
}: FavoriteButtonProps) => {
  return (
    <Pressable accessibilityRole="button" onPress={handleFavoriteToggle}>
      <Icon
        as={FavouriteIcon}
        size="xl"
        className={`${isFavorite ? "text-red-500" : "text-gray-500"}`}
      />
    </Pressable>
  );
};

export default FavoriteButton;
