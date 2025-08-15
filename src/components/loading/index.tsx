/*
  This component is used to show a loading spinner when the user is waiting for a response from the server
*/

const Loading = () => {
  return (
    <div data-testid="loading-component">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
