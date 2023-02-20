import styled from 'styled-components';
import { useState } from 'react';

import useUser from '../../../hooks/user/useUser';
import useKickUser from '../../../hooks/user/useKickUser';
import useEditUserCharacter from '../../../hooks/user/useEditUserCharacter';
import useCharacterList from '../../../hooks/character/useCharacterList';

import { ButtonBig } from '../../common/buttons/button_big';
import CharacterRadio from '../../common/radio';
import { Top } from '../../character/CharacterList/style';

import COLOR from '../../../constants/color';
import FONT from '../../../constants/fonts';

const UserSetting = ({ name }: { name: string }) => {
  const user = useUser(name);
  const kickMutation = useKickUser();
  const editMutation = useEditUserCharacter(name);
  const characterList = useCharacterList();
  const [selected, setSelected] = useState(user?.character || 'Admin');

  const handleClickKickUser = (id: number) => {
    kickMutation.mutate(id);
  };

  const handleClickEditUser = (id: number, userId: string, char: string) => {
    editMutation.mutate({ id: id, character: char });
  };

  return (
    <Container>
      {user === undefined ? (
        <div>해당 유저가 존재하지 않습니다</div>
      ) : (
        <>
          <Content>
            <Top>
              <Title style={FONT.HEADING}>유저 관리</Title>
              <Text
                onClick={() => handleClickKickUser(user.id)}
                style={FONT.SUBTITLE2}
              >
                유저 강제 퇴장
              </Text>
            </Top>
            <UserInfo>
              <Name>
                <UserName style={FONT.SUBTITLE3}>{user.name}</UserName>
                <UserId style={FONT.SUBTITLE2}>{user.user_id}</UserId>
              </Name>
              <Tag style={FONT.SUBTITLE1}>{user.character}</Tag>
            </UserInfo>

            <CharacterRadio
              data={characterList || []}
              selected={selected}
              setSelected={setSelected}
            />
          </Content>
          <ButtonBig
            content="유저 역할 수정"
            color={COLOR.GREEN4}
            onClick={() => handleClickEditUser(user.id, user.user_id, selected)}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
  height: 100%;
  background: ${COLOR.WHITE};

  border-radius: 1rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  overflow: auto;
`;

const Title = styled.div`
  width: max-content;
  white-space: nowrap;
`;

const Text = styled.button`
  width: max-content;
  color: ${COLOR.GREEN4};
`;

const UserInfo = styled.div`
  width: 100%;
  padding: 2rem;

  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${COLOR.GRAY0};
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.div`
  color: ${COLOR.GRAY4};
`;
const UserId = styled.div`
  color: ${COLOR.GRAY3};
`;

const Tag = styled.div`
  width: max-content;
  padding: 0.25rem 0.5rem;

  border: 2px solid ${COLOR.GREEN4};
  border-radius: 0.5rem;
  color: ${COLOR.GREEN4};
  background: ${COLOR.GREEN1};
`;

export default UserSetting;
