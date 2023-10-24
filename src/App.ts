import styled, { css, keyframes } from 'styled-components';

export const Wrapper = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const Logotype = styled.img`
  margin-bottom: 20px;
  width: 400px;
`;

export const CustomFileUpload = styled.label`
  height: 120px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #444;
  border: 1px solid #555; 
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

export const TextInputWrapper = styled.div`
  height: auto;
  width: 600px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4); 
  border: 1px solid #555; 
  margin-top: 20px; // aqui
`;

export const TextInput = styled.textarea`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  padding: 10px;
  background-color: transparent;
  border: none; 
  font-size: 16px;
  color: #fff; 
  resize: none; 
  overflow: hidden; 
  min-height: 60px;
  width: 100%; 
  margin-right: 25px;
  outline: none;

  &:active {
    border: node;
    }
`;

export const StartButton = styled.button`
  padding: 6px 6px;
  border-radius: 5px;
  background-color: #8257e5;
  border: none; 
  color: #fff;
  cursor: pointer;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-right: 8px;

  &:disabled {
    background-color: transparent;
    color: #555;
  }

  &:hover {
    background-color: #9466ff;
    &:disabled {
    background-color: transparent;
    color: #555;
  }

  }

  &:active {
    transform: scale(90%);
    &:disabled {
      transform: scale(100%);
  }
    }
`;

const changeColor = keyframes`
  0% {
    background-color: #333;
  }
  20% {
    background-color: #444;
  }
  50% {
    background-color: #555;
  }
  80% {
    background-color: #444;
  }
  100% {
    background-color: #333;
  }
`;

export const TextWrapper = styled.textarea<{ isLoading?: boolean }>`
  margin-bottom: 20px;
  height: 300px;
  width: 900px;
  padding: 8px;
  resize: none;
  background-color: #444;
  border: 1px solid #555;
  overflow: auto;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  outline: none;
  scrollbar-width: thin;
  scrollbar-color: #777 #444;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #777;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #444;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${changeColor} 2s linear infinite;
    `}

`;

export const ResetButton = styled.button`
  height: 50px;
  width: 920px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #444;
  border: 1px solid #555; 
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: #9466ff;
    &:disabled {
    background-color: transparent;
    color: #555;
  }

  }

  &:active {
    transform: scale(98%);
    &:disabled {
      transform: scale(100%);
  }
    }
`;