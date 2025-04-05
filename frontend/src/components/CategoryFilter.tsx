import { useEffect, useState } from 'react'; // Import React hooks for state and side effects
import './CategoryFilter.css'; // Import component-specific styles

/**
 * CategoryFilter component that displays checkboxes for filtering books by category
 * @param {string[]} selectedCategories - Currently selected categories
 * @param {function} setSelectedCategories - Function to update selected categories
 */
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  // State to store available categories fetched from API
  const [categories, setCategories] = useState<string[]>([]);

  // Effect hook to fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch book categories from the API
        const response = await fetch(
          'https://mission13-backend-fellows-czhchvccf9f3bvez.eastus-01.azurewebsites.net/api/Book/GetBookTypes'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data); // Update categories state with fetched data
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Handle checkbox selection/deselection
   * @param {Object} param0 - Event object containing the target element
   */
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    // If category is already selected, remove it; otherwise, add it
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value) // Remove category
      : [...selectedCategories, target.value]; // Add category
    setSelectedCategories(updatedCategories); // Update parent component state
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {/* Map through categories and create a checkbox for each */}
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter; // Export component for use in other files
