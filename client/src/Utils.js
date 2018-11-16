
export const getParams = location => {
    const searchParams = new URLSearchParams(location.search);
    return {
      q: searchParams.get('q') || ''
    };
  };

export const setParams = ({ q }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('q', q || '');
    return searchParams.toString();
  };
