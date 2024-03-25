export default function InteractiveSection({children} : {children: React.ReactNode}) {

    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type == 'mouseover') {   
            event.currentTarget.classList.remove('shadow-lg')
            event.currentTarget.classList.add('shadow-2xl')
        } else {
            event.currentTarget.classList.remove('shadow-2xl')
            event.currentTarget.classList.add('shadow-lg')
        }
    }

    return (
        <div className = 'w-full text-black bg-slate-200 rounded-lg shadow-lg' onMouseOver={(e) => onCardMouseAction(e)} onMouseOut={(e) => onCardMouseAction(e)}>
            { children }
        </div>
    );
}