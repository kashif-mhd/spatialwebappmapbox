import React from 'react'
import { Button } from '../../components/ui/button'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"



const Topbar = () => {
  return (
    <div className='py-2 px-6 bg-primary/5 flex items-center justify-between'>
      <div className="flex items-center gap-x-2">
          <Button variant="ghost" size="icon">
            <Menu  className="h-6 w-6" />
          </Button>
          <span className='font-semibold text-xl'>Dashboard</span>
      </div>
      <DropdownMenu>
      <DropdownMenuTrigger className='inline-flex items-center gap-4 text-sm'>
       <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>AA</AvatarFallback>
      </Avatar> 
      Ali Abdullah
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  )
}

export default Topbar