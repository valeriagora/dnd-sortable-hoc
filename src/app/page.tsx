"use client";

import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable as arrayMove } from "array-move";
import { styled } from "@mui/material";

const sizes = {
  sm: {
    width: 320,
    height: 200,
  },
  md: {
    width: 656,
    height: 416,
  },
  lg: {
    width: 992,
    height: 200,
  },
};

const StyledCard = styled("li")(({ size }: any) => ({
  border: "2px solid #333",
  borderRadius: 20,
  // marginBottom: 16,
  // marginRight: 16,
  width: sizes[size].width,
  minWidth: sizes[size].width,
  height: sizes[size].height,
  display: "inline-block",

  // "&:nth-child(3n)": {
  //   marginRight: 0,
  //   border: "1px solid pink",
  // },
}));
const SortableItem = SortableElement(({ value, size }: any) => (
  <StyledCard size={size}>
    <div
      style={{
        width: "26px",
        height: "26px",
        border: "1px solid #ccc",
        pointerEvents: "auto",
      }}
    >
      ...
    </div>
    {value}
  </StyledCard>
));

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <ul
      style={{
        border: "2px solid crimson",
        borderRadius: 20,
        width: 996,
        boxSizing: "border-box",
        // display: "flex",
        // flexWrap: "wrap",
        // gap: 16,
      }}
    >
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value.content}`}
          index={index}
          value={value.content}
          size={value.size}
        />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: [
      { content: "Item 1", size: "sm" },
      { content: "Item 2", size: "sm" },
      { content: "Item 3", size: "sm" },
      { content: "Item 4", size: "sm" },
      { content: "Item 5", size: "md" },
      { content: "Item 6", size: "lg" },
    ],
  };
  onSortEnd = ({ oldIndex, newIndex }: any) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return (
      <SortableList
        axis={"xy"}
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        // hideSortableGhost={false}
        // lockToContainerEdges={true}
      />
    );
  }
}

export default SortableComponent;
