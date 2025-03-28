import {useState} from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    //Pieces together the required components for the BookPage
  return (
    <div className="container mt-4">
        <WelcomeBand />
        <CartSummary />
        <div className="row">
            <div className="col-md-3">
                <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                />
            </div>
            <div className="col-md-9">
                <BookList selectedCategories={selectedCategories} />
            </div>
        </div>
    </div>
    
  );
}

export default BookPage;