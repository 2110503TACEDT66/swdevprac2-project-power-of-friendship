import InteractiveCard from './interactiveCard';
import Image from 'next/legacy/image';

export default function productcard({companyName, imgSrc, onCompare} : {companyName:string, imgSrc:string, onCompare?:Function}){
    console.log(imgSrc)
    return (
        <InteractiveCard>
                <div className='w-full h-[70%] relative rounded-t-lg'>
                    <Image src={imgSrc}
                    alt='Product Picture'
                    layout='fill'
                    className='object-cover rounded-t-lg'/>
                </div>
                <div className='w-full h-[15%] p-[10px]'>{companyName}</div>
                {
                    onCompare ? <button className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadown-sm' onClick={ (e) => {e.stopPropagation(); e.preventDefault(); onCompare(companyName)} }>
                        Compare
                    </button> : ''
                }        
        </InteractiveCard>
    );
}