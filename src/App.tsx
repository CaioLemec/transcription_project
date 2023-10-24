import React, { useState, useRef } from 'react'
import axios from 'axios'
import { PiPaperPlaneRightFill, PiUploadSimple, PiCircleDashed } from 'react-icons/pi'
import logotype from './assets/logotype.svg'
import { StyleSheetManager } from 'styled-components';
import * as S from './App.ts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const WHISPER_MODEL = 'whisper-1'
const ENGINE_MODEL = 'gpt-4'

const API_OPTIONS = {
    temperature: 0.9,
    max_tokens: 5000,
};

const App: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onChangeFile = () => {
        if (inputRef.current?.files?.length) {
            const selectedFile = inputRef.current.files[0];
            const allowedExtensions = [".mp3"];

            if (allowedExtensions.some(ext => selectedFile.name.endsWith(ext))) {
                setFile(selectedFile);
            } else {
                toast.warn("Somente arquivos .mp3!");
            }
        }
    };

    const makeChatRequest = async (transcriptionText: string, userPromptText: string) => {
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/chat/completions`,
                {
                    ...API_OPTIONS,
                    model: ENGINE_MODEL,
                    "messages": [{
                        "role": "user", "content": `
                        Eu acabei de converter um áudio em texto e o resultado foi o seguinte: "${transcriptionText}".
                        Agora, com base nessa transcrição, gostaria que você realizasse as seguintes tarefas:
                        ${userPromptText};
                        Lembre-se de fornecer resultados de alta qualidade e, sem erros ortográficos e se possível respire antes de responder.
                    `
                    }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                }
            );
            setApiResponse(response.data.choices[0].message.content);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
            toast.warn("Um erro inesperado aconteceu...");
            handleReset()
        }
    };

    const fetchAudioFile = async () => {
        if (!file) {
            return;
        }
        setLoading(true)

        const formData = new FormData();
        formData.append('model', WHISPER_MODEL);
        formData.append('file', file);

        try {
            const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    ...API_OPTIONS,
                },
            });

            setTranscription(response.data.text);
            makeChatRequest(response.data.text, userPrompt);
        } catch (error) {
            console.error(error);
        }
    };

    const handleButtonClick = () => {
        fetchAudioFile();
    };

    const handleReset = () => {
        window.location.reload();
    };

    return (
        !transcription && !apiResponse ? (
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isLoading'}>
                <S.Wrapper>
                    <S.Logotype src={logotype} className="logo react" alt="React logo" />
                    <S.CustomFileUpload>
                        {file ? file.name :
                            (<>
                                <S.FileInput type="file" ref={inputRef} accept=".mp3" onChange={onChangeFile} />
                                <PiUploadSimple /><span>Escolha um arquivo...</span>
                            </>)}
                    </S.CustomFileUpload>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <S.TextInputWrapper>
                        <S.TextInput
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="Digite o prompt..."
                        />
                        <S.StartButton isLoading={loading} disabled={!file || userPrompt === '' || loading} onClick={handleButtonClick}>{loading ? <PiCircleDashed /> : <PiPaperPlaneRightFill />}</S.StartButton>
                    </S.TextInputWrapper>
                </S.Wrapper>
            </StyleSheetManager>
        ) : (
            <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isLoading'}>
                <S.Wrapper>
                    <S.Title>Transcrição: </S.Title>
                    <S.TextWrapper
                        value={transcription?.toString()}
                        onChange={(e) => setTranscription(e.target.value)}
                    >
                        {transcription && transcription}
                    </S.TextWrapper>
                    <S.Title>Resposta: </S.Title>
                    <S.TextWrapper
                        isLoading={loading}
                        value={apiResponse?.toString()}
                        onChange={(e) => setApiResponse(e.target.value)}
                    >
                    </S.TextWrapper>
                    <S.ResetButton onClick={handleReset}>Voltar</S.ResetButton>
                </S.Wrapper>
            </StyleSheetManager>
        )
    );
};

export default App;

