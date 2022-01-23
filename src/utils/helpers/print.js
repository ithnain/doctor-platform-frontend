const print = (selectionArray) => {
    const frame = document.createElement('iframe');
    frame.style.height = '0';
    frame.style.width = '0';
    frame.style.visibility = 'hidden';
    const container = document.createElement('div');
    const cln = selectionArray.cloneNode(true);

    container.appendChild(cln);
    const externalDoc = new Blob(
        [
            `<html><body>
        <style>
          @media print{
            *{
              page-break-after: always;
              }
           }
        </style>
        ${container.innerHTML}</body></html>`
        ],
        {
            type: 'text/html'
        }
    );
    frame.onload = () => {
        try {
            frame.contentWindow && frame.contentWindow.print();
        } catch (e) {
            console.log(e);
        }
    };
    frame.src = URL.createObjectURL(externalDoc);
    document.body.appendChild(frame);
    frame.addEventListener('afterprint', () => {
        frame.parentNode?.removeChild(frame);
    });
};
export default print;
