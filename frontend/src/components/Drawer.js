import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function MenuDrawer() {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	
	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		 	return;
		}
	
		setState({ ...state, [anchor]: open });
	};

	return (
		<React.Fragment key={anchor}>
			<Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
			>
				<Box
					sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
					role="presentation"
					onClick={toggleDrawer(anchor, false)}
					onKeyDown={toggleDrawer(anchor, false)}
				>
					<List>
						<ListItem key="Start tests" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<RocketLaunchIcon />
								</ListItemIcon>
								<ListItemText primary="Start tests" />
							</ListItemButton>
						</ListItem>
						<Divider />
						<ListItem key="Accept all" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<ThumbUpAltIcon />
								</ListItemIcon>
								<ListItemText primary="Accept all" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Refuse all" disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<ThumbDownAltIcon />
								</ListItemIcon>
								<ListItemText primary="Refuse all" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</React.Fragment>
	);
}