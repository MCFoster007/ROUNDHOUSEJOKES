type ButtonProps = {
    onResults: (data: any) => void;
  };
  
  const ApiSearchButton: React.FC<ButtonProps> = ({ onResults }) => {
    const handleClick = async () => {
      const data = await searchAPI();
      onResults(data);
    };
  
  const searchAPI = async () => {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/Programming`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Invalid API response, check the network tab');
      }
      console.log(data)
      return data;
    } catch (err) {
      console.error('An error occurred:', err);
      return [];
    }
  };
  
    return (
      <button onClick={handleClick}>
        Search API
      </button>
    );
  };
  
  export default ApiSearchButton;