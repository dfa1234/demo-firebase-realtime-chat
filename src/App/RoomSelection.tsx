import React, {FC, useState} from "react";
import {Button, Snackbar, TextField} from "@material-ui/core";
import styled from "styled-components";
import Alert from '@material-ui/lab/Alert';
import {Box} from "../utils/Box";
import { useHistory } from "react-router-dom";

export const RoomSelection: FC<any> = ({login}) => {

    const history = useHistory();
    const [roomId, setRoomId] = useState();
    const [openError, setOpenError] = useState(false);


    return <MainWrapper>
        <FullWidthField label="RoomId" onChange={(event) => setRoomId(event?.target?.value)}/>
        <FullWidthField label="Username" onChange={(event) => login(event?.target?.value)}/>
        <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{marginTop:50}}
            onClick={() => {

                if(!roomId){
                    setOpenError(true)
                    return;
                }
                history.push('/chat/'+roomId);
            }}>
            Enter
        </SubmitButton>
        <Snackbar open={openError} autoHideDuration={4000} onClose={()=> setOpenError(false)}>
            <Alert variant="filled" onClose={()=> setOpenError(false)} severity="error">
                Please provide a valid room id
            </Alert>
        </Snackbar>
    </MainWrapper>
}


const MainWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300
})

const FullWidthField = styled(TextField)({
    width:'100%'
})

const SubmitButton = styled(Button)({
    width:'100%'
})
