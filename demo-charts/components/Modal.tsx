"use client";

// Import React and the useState hook for component state management
// React - core React library
// useState - React hook for managing component state
import React, { useState } from 'react';

// Import TypeScript types for type safety
// ChartDataPoint - interface defining the structure of a data point
// ChartType - union type for supported chart types
import { ChartDataPoint, ChartType } from '../types';

// Import utility function for number formatting
// formatNumber - formats numbers with locale-specific separators
import { formatNumber } from '../lib/transformData';

/**
 * Interface defining the props for the Modal component
 * This ensures type safety for component inputs
 */
interface ModalProps {
  /** Data point to display in the modal */
  data: ChartDataPoint;
  /** Title of the chart that triggered the modal */
  chartTitle: string;
  /** Type of chart that triggered the modal */
  chartType: ChartType;
  /** Callback function to handle modal close */
  onClose: () => void;
}

/**
 * Modal Component - Detailed information display for data points
 * 
 * This component displays detailed information about a selected
 * data point in a modal overlay. It provides contextual information
 * about the data point within the chart it originated from.
 * 
 * Key features:
 * - Overlay background that closes modal when clicked
 * - Detailed data point information display
 * - Contextual chart information
 * - Responsive design with mobile support
 * - Keyboard accessibility (ESC to close)
 * - Smooth entrance animations
 * 
 * Technical implementation:
 * - Uses React state hooks for local state management
 * - Implements event delegation for efficient handling
 * - Provides accessibility features for screen readers
 * - Uses CSS classes for consistent styling
 * - Implements proper cleanup with useEffect (not shown here)
 * 
 * @param data - Selected data point to display
 * @param chartTitle - Title of the source chart
 * @param chartType - Type of the source chart
 * @param onClose - Callback to close the modal
 */
const Modal: React.FC<ModalProps> = ({ data, chartTitle, chartType, onClose }) => {
  // State for controlling modal visibility animation
  // isVisible - flag indicating if modal is fully visible
  // setIsVisible - function to update visibility state
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Handle click events on the modal overlay
   * 
   * This function closes the modal when user clicks outside
   * the content area (on the semi-transparent overlay).
   * 
   * @param e - Click event object
   */
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Check if click occurred on the overlay (not content)
    if (e.target === e.currentTarget) {
      // Call the close callback
      onClose();
    }
  };

  /**
   * Handle keyboard events for modal interaction
   * 
   * This function enables keyboard navigation by closing
   * the modal when user presses the Escape key.
   * 
   * @param e - Keyboard event object
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check if Escape key was pressed
    if (e.key === 'Escape') {
      // Call the close callback
      onClose();
    }
  };

  /**
   * Get descriptive text for the chart type
   * 
   * This function returns a human-readable description
   * of the chart type for better user understanding.
   * 
   * @param type - Chart type to describe
   * @returns Human-readable description of the chart type
   */
  const getChartTypeDescription = (type: ChartType): string => {
    // Map chart types to descriptive text
    switch (type) {
      case 'bar': return 'столбчатой диаграммы';
      case 'line': return 'линейной диаграммы';
      case 'pie': return 'круговой диаграммы';
      default: return 'диаграммы';
    }
  };

  // Trigger entrance animation after component mount
  React.useEffect(() => {
    // Set visibility to true after a short delay
    const timer = setTimeout(() => setIsVisible(true), 10);
    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Render the modal component
  return (
    // Overlay container with semi-transparent background
    <div 
      // Click handler for overlay interactions
      onClick={handleOverlayClick}
      // Keyboard handler for ESC key
      onKeyDown={handleKeyDown}
      // Enable keyboard event handling
      tabIndex={-1}
      // CSS classes for overlay styling and transitions
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
        // Conditional class for opacity transition
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Modal content container with card-like styling */}
      <div 
        // CSS classes for content styling and transitions
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          // Conditional classes for entrance animation
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Modal header with title and close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          {/* Header title with descriptive text */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {/* Dynamic title with chart context */}
            Детали {getChartTypeDescription(chartType)}
          </h3>
          {/* Close button with circular styling */}
          <button
            // Click handler for close button
            onClick={onClose}
            // CSS classes for button styling
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 transition-colors duration-200"
            // Accessibility attributes
            aria-label="Закрыть"
          >
            {/* Close icon using SVG */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal body with data point details */}
        <div className="p-6">
          {/* Data point label with emphasis */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Категория</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-4">{data.label}</p>
          
          {/* Data point value with formatting */}
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Значение</p>
          <div className="flex items-baseline">
            {/* Formatted value with large text */}
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(data.value)}
            </span>
            {/* Units indicator */}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">единиц</span>
          </div>
        </div>
        
        {/* Modal footer with source information */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          {/* Source chart information */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {/* Dynamic source text with chart title */}
            Источник: <span className="font-medium">{chartTitle}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the Modal component as default
export default Modal;