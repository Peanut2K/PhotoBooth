import React from "react";

interface props {
  cardTitle: string;
  cardSubtitle: string;
  cardContent: string;
}

const CardHeader = ({
  cardTitle,
  cardSubtitle,
}: {
  cardTitle: string;
  cardSubtitle: string;
}) => {
  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="text-lg font-bold">{cardTitle}</h2>
      <p className="text-gray-600">{cardSubtitle}</p>
    </div>
  );
};

const CardContent = ({ message }: { message: string }) => {
  return (
    <div className="mt-4">
      <p>{message}</p>
    </div>
  );
};

const LetterCard = ({ cardTitle, cardSubtitle, cardContent }: props) => {
  return (
    <div className="flex flex-col rounded-md border p-4 shadow-md">
      <Envelope />
      <CardContent message={cardContent} />
    </div>
  );
};

const Envelope = () => {
  return (
    <div className="w-full bg-yellow-100">
        
    </div>
  );
};

export default LetterCard;
