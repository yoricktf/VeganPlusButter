import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

export default function LoginComponent() {
  const [loggedInUser, setLoggedInUser] = useState();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    try {
      const checkUser = async () => {
        if (session) {
          const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(session.user),
          });
          const user = await response.json();
          setLoggedInUser(user[0]);
        }
      };
      checkUser();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session && loggedInUser) {
    return (
      <div className='loginOptions'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {' '}
            <Image
              className='profile'
              src={session.user.image}
              height={30}
              width={30}
              alt={`profile picture for ${session.user.name}`}
            />
          </Avatar>
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Link href={`/profile/${loggedInUser._id}`}>
            <MenuItem sx={{ width: 120 }} onClick={handleClose}>
              Profile
            </MenuItem>
          </Link>
          <Link href={`/about`}>
            <MenuItem sx={{ width: 120 }} onClick={handleClose}>
              About
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem sx={{ width: 120 }} onClick={() => signOut()}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <div className='loginOptions'>
      <button className='signIn' onClick={() => signIn('google')}>
        Sign in
      </button>
    </div>
  );
}
