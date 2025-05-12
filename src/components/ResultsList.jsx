import React from 'react';
import { useState, useMemo } from 'react';

const ProgramTypeLabel = ({ isPointsBased }) => (
    <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
        isPointsBased
        ? 'bg-purple-100 text-purple-800'
        : 'bg-blue-100 text-blue-800'
    }`}>
        {isPointsBased ? 'Points-based' : 'Standard'}
    </span>
);

const CountryFlag = ({ country }) => (
    <div 
        className={`w-10 h-10 rounded-full flex itens-center justify-center mr-4 
            ${ country === 'Canada' ? 'bg-red-100 text-red-500' : 'bg-blue-500 text-blue-500'
            }`}>
            { country === 'Canada' ? '🇨🇦' : '🇺🇸'}
    </div>
);

const PointsBadge = ({ points }) => (
    <div
    className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
    > 
        {points} points
    </div>
);

const ProgramRequirements =({ program }) => (
    <div className="mt-3">
        <p className="text-gray-700"> 
            {program.requirements.notes}
        </p>
        {program.isPointsBased && (
            <p className="text-sm font-medium mt-2 text-purple-700">
                Required minimum points: {program.minPoints}
            </p>
        )}

        {program.notes && (
            <ul className="mt-2 text-sm text-gray-800">
                {program.notes.map((note, i) => (
                    <li key={i}> • {note}</li>
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
        <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <div 
            className="flex items-center cursor-pointer"
            onClick={toggleExpanded}
            >
                <CountryFlag country={program.country} />
            </div>
            <div className="flex items-center">
                <h3 className="font-senmibold text-lg">
                    {program.name}
                </h3>
                <ProgramTypeLabel isPointsBased={program.isPointsBased} />
            </div>

            {program.isPointsBased && program.points > 0 && (
                <PointsBadge points={program.points} />
            )}
            
            {expanded && <ProgramRequirements program={program} />}

            <div className="mt-3 text-right flex justify-between items-center">
                <button
                onClick={toggleExpanded}
                className="text-gray-500 hover:text-gray-700 text-sm"
                >
                {expanded ? 'Show less' : 'Show more'}  
                </button>

                <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
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
         className={`px-3 py-1 rounded-md text-sm font-medium ${
            activeFilter === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
         } `}
         onClick={() => onFilterChange('all')}
        >
            All
        </button>

        {countries.map(country => (
            <button
             key={country}
             className={`px-3 py-1 rounded-md text-sm font-medium ${
                activeFilter === country
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
             }`}
             onClick={() => onFilterChange(country)}
            >
                {country}
            </button>
        ))}
    </div>
    )
}

const ResultsList = ({ results }) => {
    const [filter, setFilter] =useState('all');

    const countries = useMemo(() => {
        if (!results || results.length === 0) 
            return [];
        // Extract unique countries from the results
        return [...new Set(results.map(results.map(program => program.country)))];
    }, [results]);

    const filteredResults = useMemo(() => {
        if (!results) return [];
        if (filter === 'all') return results;

        return results.filter(program => program.country === filter);
    }, [results, filter]);
    
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-amber-500 text-5xl mb-4"> 😢 </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2"> No matching programs </h3>
                <p className="text-gray-600"> 
                    Try adjusting your profile details or check back later as we add more immigration pathways.
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

        <div className="mt-6 text-sm text-gray-500 text-center">
            Found {filteredResults.length} matching programs out of {results.length} total.
        </div>
        </>
    );
};

export default ResultsList;