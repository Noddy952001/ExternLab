import "./styles.css";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const arry = (count) =>
[{
  id: `item-1`,
  content: `item 1`
},
{
  id: `item-2`,
  content: `item 2`
},{
  id: `item-3`,
  content: `item 3`
},{
  id: `item-4`,
  content: `item 4`
},{
  id: `item-5`,
  content: `item 5`
}];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 16,
  margin: `5px`,
  background: isDragging ? "blue" : "green",

  borderRadius : "10px",
  ...draggableStyle

});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: 250
});

export  function Slider() {

  const [items, setItems] = React.useState(arry(10));
  
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"} >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, idx) => (
              <Draggable key={item.id} draggableId={item.id} index={idx}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
