import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string; // O mensagem de erro
  className?: string; // Para poder estilizar o Tooltip dentro do reactjs tenho q passar o nome de uma classe
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
