/*
  This is a High Order Component (HOC) that wraps a component with a Header component.
  The HOC takes a component as an argument and returns a new component that wraps the original component with a Header component.
*/

import Header from "@/layout/Header";

const WithHeader = <Props extends object>(
  Component: React.ComponentType<Props>
) => {
  return function WrappedWithHeader(props: Props) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />

        <Component {...props} />
      </div>
    );
  };
};

export default WithHeader;
