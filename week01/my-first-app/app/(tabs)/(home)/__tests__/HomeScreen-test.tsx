import mockData from "../../../../data/paintings.json";
import { useGetPaintings } from "@/hooks/useGetPaintings";
import { render, fireEvent, screen } from "@/utils/test-utils";
import HomeScreen from "..";

jest.mock("@/hooks/useGetPaintings", () => ({
  useGetPaintings: jest.fn(),
}));

describe("HomeScreen", () => {
  // Setup the mock before each test
  beforeEach(() => {
    (useGetPaintings as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading and search input", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("header", { name: /search for a painting!/i }),
    ).toBeOnTheScreen();

    expect(
      screen.getByPlaceholderText(/search by painting, artist, or year/i),
    ).toBeOnTheScreen();
  });

  test("renders painting data and filters by search", () => {
    const mockQuery = "woman";
    render(<HomeScreen />);

    // Check if painting data is rendered
    mockData.forEach((painting) => {
      expect(screen.getByText(painting.name)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/search by painting, artist, or year/i),
      mockQuery,
    );

    // Check if the data rendered is filtered
    mockData.forEach((painting) => {
      if (painting.name.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(painting.name)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(painting.name)).not.toBeOnTheScreen();
      }
    });
  });

  test("renders updated data with filtering", () => {
    const mockQuery = "the";
    render(<HomeScreen />);

    // Check if painting data is rendered
    mockData.forEach((painting) => {
      expect(screen.getByText(painting.name)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/search by painting, artist, or year/i),
      mockQuery,
    );

    mockData.forEach((painting) => {
      // Validate only paintings with "the"
      if (painting.name.toLowerCase().includes(mockQuery)) {
        console.log(painting.name);
        expect(screen.getByText(painting.name)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(painting.name)).not.toBeOnTheScreen();
      }
    });

    // Update the `paintings` state in the context
    (useGetPaintings as jest.Mock).mockReturnValue({
      data: mockData.splice(1, 1), // Remove second item "girl with peaches"
      isFetching: false,
    });

    mockData.forEach((painting) => {
      // Validate "girl with peaches" does not render
      if (painting.name.toLowerCase().includes(mockQuery)) {
        console.log(painting.name);
        expect(screen.getByText(painting.name)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(painting.name)).not.toBeOnTheScreen();
      }
    });
  });
});
