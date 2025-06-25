import React from 'react';
import { useState, useMemo } from 'react';

const ProgramTypeLabel = ({ isPointsBased }) => (
    <span className={`text-xs px-2.5 py-1.5 rounded-full ml-2 font-mono ${
        isPointsBased
        ? 'bg-[#e9f5db] text-[#333333]'
        : 'bg-[#dde5b6] text-[#333333]'
    }`}>
        {isPointsBased ? 'Points-based' : 'Standard'}
    </span>
);

const CountryFlag = ({ country }) => (
    <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4
                    ${country === 'Canada' ? 'bg-[#ffe3e0]' :
                      country === 'USA' ? 'bg-[#e2eafc]' :
                      country === 'United Kingdom' ? 'bg-[#bee9e8]' :
                      country === 'Ireland' ? 'bg-[#e9f5db]' :
                      'bg-gray-100 text-[#333333]'
                    }`}>
                {country === 'Canada' ? '🇨🇦' :
                 country === 'USA' ? '🇺🇸' :
                 country === 'United Kingdom' ? '🇬🇧' :
                 country === 'Ireland' ? '🇮🇪' : '🌍'
                }
    </div>
);

const PointsBadge = ({ points }) => (
    <div className="bg-[#e9f5db] text-[#415d43] px-3 py-1 rounded-full text-sm font-mono font-medium inline-block">
        points: {points}
    </div>
);

const ProgramRequirements = ({ program }) => (
        <div className="mt-3">
        <p className="text-gray-700 font-mono text-sm px-15">
            {program.requirements?.notes || 'Program requirements vary. Please further check the official website for detailed eligibility criteria.'}
        </p>
        {program.isPointsBased && program.minPoints && (
            <p className="text-sm font-mono font-medium mt-2 text-[#415d43]">
                Required minimum points: {program.minPoints}
            </p>
        )}

        {program.notes && (
            <ul className="mt-2 text-sm text-gray-800 font-mono">
                {program.notes.map((note, i) => (
                    <li key={i} className="mt-2"> • {note}</li>
                ))}
            </ul>
        )}
    </div>
);

const ProgramCard = ({ program }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="border border-[#adb5bd] rounded-md p-6 hover:shadow-md transition-shadow bg-white">
            <div className="flex items-center">
                <CountryFlag country={program.country} />
                <div className="flex-1">
                    <div className="flex items-center">
                        <h3 className="font-semibold text-[#415d43] text-lg font-mono">
                            {program.name}
                        </h3>
                        <ProgramTypeLabel isPointsBased={program.isPointsBased} />
                    </div>

                    {program.isPointsBased && program.points > 0 && (
                        <div className="mt-2">
                            <PointsBadge points={program.points} />
                        </div>
                    )}
                </div>
            </div>

            {expanded && <ProgramRequirements program={program} />}

            <div className="mt-3 flex justify-between items-center">
                <button
                    onClick={toggleExpanded}
                    className="text-[#333333] hover:text-gray-700 text-sm font-mono"
                >
                    {expanded ? 'Show less' : 'Show more'}
                </button>

                <a
                    href={program.officialWebsite || program.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#344e41] hover:text-[#333333] text-sm font-mono font-medium"
                    onClick={(event) => event.stopPropagation()}
                >
                    Learn more →
                </a>
            </div>
        </div>
    );
};

const FilterBar = ({ countries, onFilterChange, activeFilter }) => {
    return (
        <div className="mb-6 flex flex-wrap gap-2">
            <button 
                className={`px-3 py-1 rounded-md text-sm font-mono font-medium ${
                    activeFilter === 'all'
                    ? 'bg-[#415d43] text-white'
                    : 'bg-[#edead0] text-gray-700 hover:bg-[#d4d7be]'
                }`}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>

            {countries.map(country => (
                <button 
                    key={country}
                    className={`px-3 py-1 rounded-md text-sm font-mono font-medium ${
                        activeFilter === country
                        ? 'bg-[#415d43] text-white'
                        : 'bg-[#edead0] text-gray-700 hover:bg-[##d4d7be]'
                    }`}
                    onClick={() => onFilterChange(country)}
                >
                    {country}
                </button>
            ))}
        </div>
    );
};

const ResultsList = ({ results }) => {
    const [filter, setFilter] = useState('all');

    const countries = useMemo(() => {
        if (!results || results.length === 0)
            return [];
        //Extract unique countries from the results
        return [...new Set(results.map(program => program.country))];
    }, [results]);

    const filteredResults = useMemo(() => {
        if(!results) return [];
        if(filter === 'all') return results;

        return results.filter(program => program.country === filter);
    }, [results, filter]);

    if (!results || results.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-amber-500 text-5xl mb-4"> 😢 </div>
                <h3 className="text-xl font-mono font-medium text-gray-800 mb-2"> No matching programmes </h3>
                <p className="text-gray-600 font-mono text-sm">
                    Try updating your profile details or check back later as we add more immigration pathways.
                </p>
            </div>
        );
    }

    return (
        <>
            <FilterBar
                countries={countries}
                onFilterChange={setFilter}
                activeFilter={filter}
             />
             <div className="space-y-4">
                {filteredResults.map((program, index) => (
                    <ProgramCard 
                        key={`${program.country}-${program.name}-${index}`}
                        program={program}
                    />
                ))}
             </div>

             <div className="mt-6 text-sm text-gray-500 text-center font-mono">
                Found {filteredResults.length} matching programs out of {results.length} total.
             </div>
        </>
    );
};

export default ResultsList;