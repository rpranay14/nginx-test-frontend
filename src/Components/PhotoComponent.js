import React from 'react'

const PhotoComponent = ({imgUrl,restoredImage,setShowPhotoComp}) => {
    const downloadImage = () => {
        
        const link = document.createElement('a');
        link.href =restoredImage;
        link.target = '_blank';
        link.download = "restored-img.jpg"; // Default file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
    return (
        <>
        <div className='mt-12 flex flex-col sm:flex-row  gap-12  items-center justify-center'>
            <div>
                <p className='text-center mb-2  text-xl font-semibold'>Original Photo</p>
            <img src={imgUrl} width={200} height={200} className='w-[15rem] sm:w-[17rem] lg:w-[20rem] h-auto rounded-md'/>
            </div>
           <div>
            <p className='text-center mb-2  text-xl font-semibold'>Restored Photo </p>
          {restoredImage ? <img src={restoredImage} width={200} height={200} className='w-[15rem] sm:w-[17rem] lg:w-[20rem] h-auto rounded-md'/> :  <div  className='w-[15rem] h-[20rem] sm:w-[17rem] sm:h-[20rem] lg:w-[20rem]  rounded-md loader'></div>}
           </div>
          
        </div>
         <div className='flex flex-col lg:flex-row items-center justify-center mt-12 gap-4 mb-10'><button onClick={()=>setShowPhotoComp()} className='rounded-full bg-black text-white px-8 py-2 text-lg hover:opacity-80 w-[15rem] sm:w-[17rem] lg:w-[20rem]'>Upload New Photo</button><button onClick={()=>downloadImage()} className='w-[15rem] sm:w-[17rem] lg:w-[20rem] rounded-full border-[1px] border-black px-8 py-2 text-sm lg:text-lg hover:bg-black hover:text-white'>Download Restored Photo</button></div>
         </>
      )
}

export default PhotoComponent