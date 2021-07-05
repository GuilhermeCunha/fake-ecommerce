import React from 'react';
import Image from 'next/image';
export type WithoutResultsProps = {
  text?: string;
};
const WithoutResults = ({
  text = 'Parece que não há resultados aqui.',
}: WithoutResultsProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-center">
      <Image
        src="/illlustrations/without-results.svg"
        width="164"
        height="164"
        alt="asd"
      />
      <span className="font-light mt-4">{text}</span>
    </div>
  );
};

export default WithoutResults;
