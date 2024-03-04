import './library-component.board.css';
import React from 'react';
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Library Component',
    Board: () => <div>
<input type="file" className="Upload" />
</div>,
    isSnippet: true,
    environmentProps: {
windowWidth: 1058,
canvasHeight: 27,
windowBackgroundColor: '#767676',
canvasBackgroundColor: 'rgba(190, 105, 105, 0)',
canvasWidth: 257
}
});