import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Flex, Text } from "@chakra-ui/core"

import {Message, Messages} from "../../dtos/MessageDTO"

const socket = io();
var key = 0

const Msg: React.FC = () => {

  const [msgFromServer, setMsgFromServer] = useState<Messages>([])
  const scrollControll = useRef<HTMLInputElement>(null)
 // const { setMessage } = Context();

  useEffect(()=>{
    socket.on('returnedMessage', (msg: Messages): void => {
      setMsgFromServer(msg)
      scrollControll.current?.scrollIntoView()
    })
  },[])

  const render = () => {
    return <>{msgFromServer.map(msg => <Format {...msg} key={key++} />)}</>
  }

  const Format = ({ message, date }: Message) => {
    return (
      <Flex
      flexDir="row"
      m="10px"
      alignItems="flex-end"
      >
      <Flex
        bg="teal.500"
        borderRadius="6px 6px 0 6px"
        flexDir="column"
        //alignItems="flex-end"
        ref={scrollControll}
        p="6px"
      >
        <Text fontSize="lg" color="#fff">{message}</Text>
        <Text alignSelf="flex-end" fontSize="10px" as="i" color="#ccc">{date}</Text>
      </Flex>
      <Flex
        width='0'
        height='0'
        borderTop='7px solid transparent'
        borderBottom='0 solid transparent'
        borderLeft='6px solid #319795'
      />
      </Flex>)
  }
  return render()
}

export { Msg };

/*

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Flex, Text } from "@chakra-ui/core"

import { Context } from "../../contexts";


interface Message {
  message: string;
  date: string
}
type Messages = Array<Message>

const socket = io();
var key = 0

const Msg: React.FC = () => {

  const [msgFromServer, setMsgFromServer] = useState<Messages>([])
  const scrollControll = useRef<HTMLInputElement>(null)
  const { setMessage } = Context();

  useEffect(()=>{
    socket.on('messageHistory', (msg: Messages): void => {
      setMsgFromServer(msg)
      scrollControll.current?.scrollIntoView()
    })
  },[])


  const render = () => {
    return <>{msgFromServer.map(msg => <Format {...msg} key={key++} />)}</>
  }

  const Format = ({ message, date }: Message) => {
    return (
      <Flex
      flexDir="row"
      m="10px"
      alignItems="flex-end"
      >
      <Flex
        bg="teal.500"
        borderRadius="6px 6px 0 6px"
        flexDir="column"
        //alignItems="flex-end"
        ref={scrollControll}
        p="6px"
      >
        <Text fontSize="lg" color="#fff">{message}</Text>
        <Text fontSize="10px" as="i" color="#ccc">{date}</Text>
      </Flex>
      <Flex
        width='0'
        height='0'
        borderTop='7px solid transparent'
        borderBottom='0 solid transparent'
        borderLeft='6px solid #319795'
      />
      </Flex>)
  }
  return render()
}

export { Msg };

*/
