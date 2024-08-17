import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className='text-3xl font-bold text-[#183153] mb-8 mt-12' {...props} />,
    h2: (props) => <h2 className='text-2xl font-bold text-[#183153] mb-4 mt-12' {...props} />,
    h3: (props) => <h2 className='text-xl font-bold text-[#183153] mb-2 mt-12' {...props} />,
    ul: (props) => <ul className='list-disc list-inside my-4' {...props} />,
    li: (props) => <li className='text-lg' {...props} />,
    p: (props) => <p className='text-lg' {...props} />,
    img: (props) => <div className="my-6 drop-shadow-lg w-full flex flex-col justify-center items-center">
        <img
            className="rounded-md" 
            {...props}
        />
        <p className="mt-4 font-light italic text-gray-500">
            {props.alt}
        </p>
    </div>,
    blockquote: (props) => <blockquote className="border-r-4 border-green-700 pr-4 my-4 text-green-700 font-normal italic" {...props} />,
    strong: (props) => <strong className="font-bold text-[#183153]" {...props} />,
    ...components
  }
}
