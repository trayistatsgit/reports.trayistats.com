import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLanguages } from '../../Slice/languageSlice'; // Import the fetchAllLanguages action

const LanguageList = ({ onChange }) => {
  const dispatch = useDispatch();

  const languages = useSelector((state) => state.language.languages);
  const status = useSelector((state) => state.language.status);
  const error = useSelector((state) => state.language.error);

  useEffect(() => {
    dispatch(fetchAllLanguages());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading languages...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Ensure 'Records' exists and is an array before mapping
  const languageList = languages?.Records || [];

  return (
    <div>
      <select
        className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-full"
        onChange={(e) => onChange(e.target.value)} // Trigger onChange with selected value
      >
        <option value="">Select Language</option>
        {languageList.map((language) => (
          <option key={language.LangCode} value={language.LangCode}>
            {language.LangCode} {/* You can use another property, such as language name */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageList;
