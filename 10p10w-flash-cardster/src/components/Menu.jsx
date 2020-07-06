import React from 'react';

function Menu(props) {
  const [state, setState] = React.useState({
    activePage: props.children[0].props.label,
    children: props.children
  });
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className='Menu'>
      <div className='menu-menu' onClick={toggleDropdown}>
        <div className='menu-opener'>{state.activePage} <i className={(() => {
            return dropdownOpen ? 'fas fa-chevron-down dropdown-icon dropdown-icon--rotated' : 'fas fa-chevron-down dropdown-icon';
          })()}></i></div>
        <div
          className={(() => {
            return dropdownOpen ? 'menu-btn-ctn open' : 'menu-btn-ctn';
          })()}
        >
          {props.children.map(child => {
            return (
              <button
                onClick={() => {
                  toggleDropdown();
                  setState({
                    activePage: child.props.label,
                    children: state.children
                  });
                }}
                key={child.props.label}
                className={(() => {
                  if (child.props.label === state.activePage) {
                    return 'active';
                  }
                })()}
              >
                {child.props.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className='menu-content'>
        {
          state.children.find(child => child.props.label === state.activePage)
            .props.children
        }
      </div>
    </div>
  );
}

export default Menu;
