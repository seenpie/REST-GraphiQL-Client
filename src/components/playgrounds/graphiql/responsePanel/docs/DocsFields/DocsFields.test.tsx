import { screen, fireEvent } from "@testing-library/react";
import { DocsFields } from "@/components/playgrounds/graphiql/responsePanel/docs/DocsFields/DocsFields";
import {
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList
} from "graphql";
import { renderWithProviders } from "@/test/setup/testStore";

const mockPush = vi.fn();

describe("DocsFields", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders scalar type correctly", () => {
    const scalarType = new GraphQLScalarType({
      name: "String",
      description: "A scalar string type"
    });

    const typeData = {
      data: scalarType,
      name: "String"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(screen.getByText("String")).toBeInTheDocument();
    expect(screen.getByText("description:")).toBeInTheDocument();
    expect(screen.getByText("A scalar string type")).toBeInTheDocument();
  });

  it("renders object type with fields and calls push on field click", () => {
    const objectType = new GraphQLObjectType({
      name: "User",
      fields: {
        id: { type: new GraphQLScalarType({ name: "ID" }) },
        name: { type: new GraphQLScalarType({ name: "String" }) }
      }
    });

    const typeData = {
      data: objectType,
      name: "User"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();

    fireEvent.click(screen.getByText("id"));
    expect(mockPush).toHaveBeenCalledWith(objectType.getFields().id);

    fireEvent.click(screen.getByText("name"));
    expect(mockPush).toHaveBeenCalledWith(objectType.getFields().name);
  });

  it("renders enum type correctly", () => {
    const enumType = new GraphQLEnumType({
      name: "Color",
      values: {
        RED: { value: "red" },
        BLUE: { value: "blue" }
      }
    });

    const typeData = {
      data: enumType,
      name: "Color"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("values")).toBeInTheDocument();
    expect(screen.getByText("RED")).toBeInTheDocument();
    expect(screen.getByText("BLUE")).toBeInTheDocument();
  });

  it("renders interface type correctly", () => {
    const interfaceType = new GraphQLInterfaceType({
      name: "Character",
      fields: {
        id: { type: new GraphQLScalarType({ name: "ID" }) }
      }
    });

    const typeData = {
      data: interfaceType,
      name: "Character"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(screen.getByText("Character")).toBeInTheDocument();
    expect(screen.getByText("description:")).toBeInTheDocument();
    expect(screen.getByText("id")).toBeInTheDocument();

    fireEvent.click(screen.getByText("id"));
    expect(mockPush).toHaveBeenCalledWith(interfaceType.getFields().id);
  });

  it("renders input object type correctly", () => {
    const inputObjectType = new GraphQLInputObjectType({
      name: "UserInput",
      fields: {
        username: { type: new GraphQLScalarType({ name: "String" }) },
        password: { type: new GraphQLScalarType({ name: "String" }) }
      }
    });

    const typeData = {
      data: inputObjectType,
      name: "UserInput"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(screen.getByText("UserInput")).toBeInTheDocument();
    expect(screen.getByText("username")).toBeInTheDocument();
    expect(screen.getByText("password")).toBeInTheDocument();
  });

  it("handles nested list and non-null types correctly", () => {
    const listType = new GraphQLList(
      new GraphQLNonNull(new GraphQLScalarType({ name: "String" }))
    );

    const typeData = {
      data: listType,
      name: "StringList"
    };

    renderWithProviders(<DocsFields typeData={typeData} push={mockPush} />);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
