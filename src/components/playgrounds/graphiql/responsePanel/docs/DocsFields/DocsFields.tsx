import {
  isListType,
  isNonNullType,
  isObjectType,
  GraphQLArgument,
  isScalarType,
  isEnumType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLEnumType,
  isInputObjectType,
  GraphQLField,
  isInterfaceType,
  GraphQLInterfaceType,
  GraphQLInputObjectType
} from "graphql";
import { HistoryState, HistoryStateDataType } from "@/models/types";

type DocsFieldsProps = {
  typeData: HistoryState;
  push: (field: HistoryStateDataType) => void;
};

export function DocsFields({ typeData, push }: DocsFieldsProps) {
  const { data, name } = typeData;

  const doForGraphQlArguments = (args: readonly GraphQLArgument[]) => {
    if (!args || !args.length) return null;

    return (
      <ul>
        {args.map((arg) => (
          <li key={arg.name}>
            <span>{arg.name}: </span>
            <span onClick={() => push(arg.type)}>
              {arg.type.toString() || ""}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  function doForScalarType(gqlType: GraphQLScalarType) {
    const fields = Object.values([gqlType.toConfig()]);

    return (
      <>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <ul>
            {fields.map((field) => (
              <li key={field.name}>
                <span>description: </span>
                <span>{field.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  function doForDetailField(field: GraphQLField<unknown, unknown>) {
    const args = doForGraphQlArguments(field.args);
    return (
      <>
        <div>
          <span onClick={() => push(field.type)}>
            Type: {field.type.toString()}
          </span>
        </div>
        {args ? (
          <div>
            <span>Arguments: </span>
            {args}
          </div>
        ) : null}
      </>
    );
  }

  function doForObjectType(gqlType: GraphQLObjectType) {
    const fields = Object.values(gqlType.getFields());
    return (
      <>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <ul>
            {fields.map((field) => {
              const args = doForGraphQlArguments(field.args);

              return (
                <li key={field.name}>
                  <span onClick={() => push(field)}>{field.name}</span>
                  {args ? (
                    <>
                      <span> (</span>
                      {args}
                      <span>): </span>
                    </>
                  ) : (
                    <span>: </span>
                  )}
                  <span onClick={() => push(field.type)}>
                    {field.type.toString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }

  function doForEnumType(gqlType: GraphQLEnumType) {
    const fields = gqlType.getValues();
    return (
      <>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <span>values</span>
          <ul>
            {fields.map((field) => (
              <li key={field.name}>
                <span>{field.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  function doForInterfaceType(gqlType: GraphQLInterfaceType) {
    const fields = Object.values(gqlType.getFields());

    return (
      <>
        <div>
          <span>{name}</span>
          <span>description: {gqlType.description}</span>
        </div>
        <div>
          <ul>
            {fields.map((field) => {
              const args = doForGraphQlArguments(field.args);

              return (
                <li key={field.name}>
                  <span onClick={() => push(field)}>{field.name}</span>
                  {args ? (
                    <>
                      <span> (</span>
                      {args}
                      <span>): </span>
                    </>
                  ) : (
                    <span>: </span>
                  )}
                  <span onClick={() => push(field.type)}>
                    {field.type.toString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }

  function doForInputObjectType(gqlType: GraphQLInputObjectType) {
    const fields = Object.values(gqlType.getFields());

    return (
      <>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <ul>
            {fields.map((field) => (
              <li key={field.name}>
                <span>{field.name}</span>
                <span onClick={() => push(field.type)}>
                  {field.type.toString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  function detectType(gqlData: HistoryStateDataType) {
    if (isScalarType(gqlData)) {
      return doForScalarType(gqlData);
    }

    if (isObjectType(gqlData)) {
      return doForObjectType(gqlData);
    }

    if (isInputObjectType(gqlData)) {
      return doForInputObjectType(gqlData);
    }

    if (isEnumType(gqlData)) {
      return doForEnumType(gqlData);
    }

    if (isInterfaceType(gqlData)) {
      return doForInterfaceType(gqlData);
    }

    if (isListType(gqlData) || isNonNullType(gqlData)) {
      const { ofType } = gqlData;
      return detectType(ofType);
    }

    return doForDetailField(gqlData as GraphQLField<unknown, unknown>);
  }

  return detectType(data);
}
