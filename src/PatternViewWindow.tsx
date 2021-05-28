import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Project from './Project';

// eslint-disable-next-line import/prefer-default-export
export const PatternViewWindow = (project: Project) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selected, setSelected] = useState(0);

  const handleCloseAndChangeIndex = (choice: number) => {
    handleClose();
    setSelected(choice);
  };

  return (
    <div className="PatternView">
      <div className="PatternSelector">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {project.patterns[selected].name}
        </Button>
        <Menu
          color="primary"
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {project.patterns.map((pattern, index) => {
            return (
              <MenuItem
                key={pattern.name}
                onClick={() => handleCloseAndChangeIndex(index)}
              >
                {pattern.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};
