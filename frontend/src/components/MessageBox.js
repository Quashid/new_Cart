import React from 'react';


const MessageBox = props => {
    return ( <div class={`alert alert-${props.variant || 'info'}`}>
        {props.children}
    </div>);
};



export default MessageBox;