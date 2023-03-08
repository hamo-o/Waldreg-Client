import { useRecoilState, useSetRecoilState } from "recoil";
import { BoardCategoryLists } from "../../../interfaces/board";
import { settingCategoryId, settingCategoryName } from "../../../states/board";
import FONT from "./../../../constants/fonts";
import { Category, CategoryTitle } from "./style";
import { Item } from "../../character/CharacterList/style";

interface BoardCategoryListsProps {
  boardCategoryList: BoardCategoryLists;
}

function BoardCategoryList({ boardCategoryList }: BoardCategoryListsProps) {
  const setCategoryName = useSetRecoilState(settingCategoryName);
  const [categoryId, setCategoryId] = useRecoilState(settingCategoryId);

  return (
    <>
      {boardCategoryList.categories.map((category) => {
        return (
          <Item
            key={category.category_id}
            onClick={() => {
              setCategoryId(category.category_id!);
              setCategoryName(category.category_name);
            }}
            selected={category.category_id === categoryId}
          >
            <Category>
              <CategoryTitle style={FONT.SUBTITLE2}>
                {category.category_name}
              </CategoryTitle>
            </Category>
          </Item>
        );
      })}
    </>
  );
}

export default BoardCategoryList;
