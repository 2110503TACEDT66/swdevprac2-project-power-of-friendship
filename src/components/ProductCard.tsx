import Image from 'next/image';
import InteractiveCard from './interactiveCard';

export default function ProductCard({ companyName, imgSrc, onCompare }: { companyName: string; imgSrc: string; onCompare?: Function }) {
    return (
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                    alt='Product Picture'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                    className='rounded-t-lg'
                />
            </div>
            <div className='w-full h-[15%] p-[10px] font-serif text-center'>{companyName}</div>
            {
                onCompare ? <button className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm' onClick={(e) => { e.stopPropagation(); e.preventDefault(); onCompare(companyName) }}>
                    Compare
                </button> : ''
            }
        </InteractiveCard>
    );
}
