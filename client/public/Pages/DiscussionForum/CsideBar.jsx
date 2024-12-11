import React from "react";
import { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import SearchUser from "./SearchUser"
import { useEffect } from "react";
import { useUserContext } from "../../../src/UserContext";
import Avatar from "./Avatar";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
const CsideBar = () => {
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const {user} = useUserContext();
    const socketConnection = user.socketConnection;
    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('sidebar',user._id)
            
            socketConnection.on('conversation',(data)=>{
                console.log('conversation',data)
                
                const conversationUserData = data.map((conversationUser,index)=>{
                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.sender
                        }
                    }
                    else if(conversationUser?.receiver?._id !== user?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.receiver
                        }
                    }else{
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.sender
                        }
                    }
                })

                setAllUser(conversationUserData)
            })
        }
    },[socketConnection,user])

    return (
        <div className="w-full h-full grid grid-cols-[48px,1fr] bg-slate-200">
            <div className = "bg-slate-300 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600">
                <Link to="/Forum/IntraDepartment" className="flex justify-center items-center p-3">
                    <FaAngleLeft size = {25}/>
                </Link>
                <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded ${isActive && "bg-slate-300"}`} title='chat'>
                    <CiChat1 size={20}/>
                </NavLink>
                <div onClick ={() => setOpenSearchUser(true)} className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-400 rounded" title = "addfriend">
                    <FaUserPlus size={20}/>
                </div>
            </div>
            <div className="w-full">
                <div className="h-16 flex items-center">
                <h2 className="text-xl font-bold p-4 text-slate-800 h-16">Message</h2>
                </div>
                <div className = "bg-slate-100 p-[0.5px]"></div>
                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                {
                    allUser.length === 0 && (
                        <div className='mt-12'>
                            <div className='flex justify-center items-center my-4 text-slate-500'>
                                <FiArrowUpLeft
                                    size={50}
                                />
                            </div>
                            <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>    
                        </div>
                    )
                }
                {
                    allUser.map((conv, index)=>{
                        return(
                            <div key={conv?._id}>
                                <NavLink to={"/Forum/Discussion/"+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                                    <div>
                                        <Avatar
                                            name={conv?.userDetails?.name}
                                            width={40}
                                            height={40}
                                        />    
                                    </div>
                                    <div>
                                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                                            <div className='flex items-center gap-1'>
                                            </div>
                                            <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                        </div>
                                    </div>                                    
                                    {/* {
                                        Boolean(conv?.unseenMsg) && (
                                            <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-green-400 text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                        )
                                    } */}

                                </NavLink>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)}/>
                )
            }
        </div>
    )
}
export default CsideBar;