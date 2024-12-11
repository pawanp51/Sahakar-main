import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../src/UserContext';
import Avatar from './Avatar';
import { HiDotsVertical } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import moment from 'moment';
import { useRef } from 'react';
const MessagePage = () => {
    const params = useParams();
    const {socketConnection} = useUserContext().user;
    const user = useUserContext().user;
    const [dataUser, setDataUser] = useState({
        name : "",
        email : "",
        online : false,
        _id : ""
    })
    const [message, setMessage] = useState({
        text : "",
    })
    const [allMessage, setAllMessage] = useState([]);
    const currentMessage = useRef();

    console.log(params.userId);

    useEffect(()=>{
        if(currentMessage.current){
            currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
        }
    },[allMessage])
    
    useEffect(()=>{
        if(socketConnection){
          socketConnection.emit('message-page',params.userId)
  
          socketConnection.emit('seen',params.userId)
  
          socketConnection.on('message-user',(data)=>{
            setDataUser(data)
          }) 
          
          socketConnection.on('message',(data)=>{
            console.log('message data',data)
            setAllMessage(data)
          })
        }
    },[socketConnection,params?.userId,user])
    const handleOnChange = (e) =>{
        const { name, value} = e.target;
        setMessage(prev => {
            return{
                ...prev,
                text : value
            }
        })
    }
    const handleSendMessage = (e) =>{
        e.preventDefault();
        if(message.text.length > 0){
            if(socketConnection){
                socketConnection.emit("new message",{
                    sender : user?._id,
                    receiver : params.userId,
                    text : message.text,
                    msgByUserId : user?._id
                })
            }
            setMessage({text : ""});
        }
    }
    return (
        <div>
            <header className = "sticky top-0 h-16 flex justify-between items-center px-4 bg-slate-200">
                <div className='flex items-center gap-4'>
                    <Link to="/Forum/Discussion" className='lg:hidden'>
                        <FaAngleLeft size = {25}/>
                    </Link>
                    <div>
                        <Avatar width = {50} height = {50} name = {dataUser?.name} userId = {dataUser?._id} />
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
                        <p className='-my-2 text-sm'>
                            {
                                dataUser?.online ? <span className='text-green-400'>online</span>: <span className='text-slate-400'>offline</span>
                            }
                        </p>
                    </div>
                </div>
                <div>
                    <button className='cursor-pointer hover:text-slate-600'>
                        <HiDotsVertical />
                    </button>
                </div>
            </header>

            <section className='h-[calc(100vh-128px)] bg-slate-300 overflow-x-hidden '>
                <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage} >
                    {
                      allMessage.map((msg,index)=>{
                        return(
                          <div key={index} className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
                            <p className='px-2'>{msg.text}</p>
                            <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                          </div>
                        )
                      })
                    }
                  </div>
            </section>

            <section className='h-16 bg-white flex items-center px-4'>
                <div className='relative flex justify-center items-center w-11 h-11 rounded-full hover:bg-slate-400 hover:text-white'>
                    <button>
                        <FaPlus size={20}/>
                    </button>
                </div>
                <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
                    <input type="text" placeholder='Type a message' className='py-1 px-4 outline-none w-full h-full'
                    value={message.text} onChange={handleOnChange}/>
                    <button className='hover:text-slate-600'>
                        <IoMdSend size={28}/>
                    </button>
                </form>
            </section>
        </div>
    )
}
export default MessagePage;
