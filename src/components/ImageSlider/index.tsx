import React from "react";
import { FlatList } from "react-native";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => {
          return <ImageIndex key={String(index)} active={true} />;
        })}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage source={{ uri: item }} resizeMode="contain" />{" "}
            </CarImageWrapper>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}
