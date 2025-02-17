export default function Loader() {
  return (
    <div
      className="custom-loader animate animate-move-x
       bg-gradient-to-r from-secondary/80 from-20% to-transparent to-[21%]
       bg-repeat-x bg-[length:10.5px_2.5px] bg-[position:9px_bottom]
       relative w-4 h-4

       before:absolute before:content-[''] before:w-[13.5px] before:h-[13.5px] before:bg-secondary/80 before:rounded
       before:left-[50%] before:top-[50%] before:animate-rotate
       "
    />
  )
}
