"use client"
import { User } from "@prisma/client"
import Image from "next/image";
import useActiveList from "../hooks/useActiveLists";

interface Props {
    user?: User;
}


const Profile: React.FC<Props> = ({ user }) => {

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) != -1;
    return (<div className="relative">
        <div className="relative
        inline-block
        rounded-full
        overflow-hidden
        h-9
        w-9
        md:h-11
        md:w-11">
            <Image src={user?.image || '/images/placeholder.jpg'}
                alt={"Profile Pic"}
                fill />
        </div>
        {isActive && (<span className="absolute 
       block
       rounded-full
       bg-green-500
       ring-2
       ring-white
       top-0
       right-0
       h-2
       w-2
       md:h-2.5
       md:w-2.5"/>)}

    </div>
    );
}

export default Profile;