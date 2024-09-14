import { screen, fireEvent } from "@testing-library/react";
import { DocsSchema } from "@/components/playgrounds/graphiql/responsePanel/docs/DocsSchema/DocsSchema";
import { useDocsSchema } from "@/hooks/useDocsSchema";
import { GraphQlStartTypes } from "@/models/enums";
import { renderWithProviders } from "@/__tests__/setup/testStore";
import { GraphQLObjectType, GraphQLScalarType } from "graphql";
import { GraphQLField } from "graphql/type";

vi.mock("@/hooks/useDocsSchema");

describe("DocsSchema", () => {
  const mockPush = vi.fn();
  const mockPop = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDocsSchema).mockReturnValue({
      query: { name: "Query" } as GraphQLObjectType,
      mutation: { name: "Mutation" } as GraphQLObjectType,
      subscription: { name: "Subscription" } as GraphQLObjectType,
      push: mockPush,
      pop: mockPop,
      title: "Docs",
      data: { name: "", data: {} as GraphQLField<unknown, unknown> },
      history: [],
      error: null
    });
  });

  it("renders the initial state with query, mutation, and subscription options", () => {
    renderWithProviders(<DocsSchema />);

    expect(screen.getByText("Docs")).toBeInTheDocument();

    expect(screen.getByText(GraphQlStartTypes.QUERY)).toBeInTheDocument();
    expect(screen.getByText(GraphQlStartTypes.MUTATION)).toBeInTheDocument();
    expect(
      screen.getByText(GraphQlStartTypes.SUBSCRIPTION)
    ).toBeInTheDocument();
  });

  it("calls push function when query, mutation, or subscription is clicked", () => {
    renderWithProviders(<DocsSchema />);

    fireEvent.click(screen.getByText(GraphQlStartTypes.QUERY));
    expect(mockPush).toHaveBeenCalledWith({ name: "Query" });

    fireEvent.click(screen.getByText(GraphQlStartTypes.MUTATION));
    expect(mockPush).toHaveBeenCalledWith({ name: "Mutation" });

    fireEvent.click(screen.getByText(GraphQlStartTypes.SUBSCRIPTION));
    expect(mockPush).toHaveBeenCalledWith({ name: "Subscription" });
  });

  it("renders DocsFields component when history is not empty", () => {
    vi.mocked(useDocsSchema).mockReturnValue({
      query: { name: "Query" } as GraphQLObjectType,
      mutation: { name: "Mutation" } as GraphQLObjectType,
      subscription: { name: "Subscription" } as GraphQLObjectType,
      push: mockPush,
      pop: mockPop,
      title: "Docs",
      data: {
        name: "ID",
        data: new GraphQLScalarType({ name: "ID" })
      },
      history: [
        {
          name: "Name",
          data: new GraphQLScalarType({ name: "Name" })
        }
      ],
      error: null
    });

    renderWithProviders(<DocsSchema />);

    expect(screen.getByText("back")).toBeInTheDocument();

    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  it("calls pop function when back is clicked", () => {
    vi.mocked(useDocsSchema).mockReturnValue({
      query: { name: "Query" } as GraphQLObjectType,
      mutation: { name: "Mutation" } as GraphQLObjectType,
      subscription: { name: "Subscription" } as GraphQLObjectType,
      push: mockPush,
      pop: mockPop,
      title: "Docs",
      data: {
        name: "ID",
        data: new GraphQLScalarType({ name: "ID" })
      },
      history: [
        {
          name: "Name",
          data: new GraphQLScalarType({ name: "Name" })
        }
      ],
      error: null
    });

    renderWithProviders(<DocsSchema />);

    fireEvent.click(screen.getByText("back"));
    expect(mockPop).toHaveBeenCalled();
  });
});
