"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyList } from "@/src/components/property-management/PropertyList";
import { PropertyForm } from "@/src/components/property-management/PropertyForm";
import {
  useDeletePropertiesMutation,
  useGetAdminPropertiesQuery,
} from "@/src/redux/features/Admin/Properties/propertiesApi";
import { Property } from "@/src/utils/properties";

const PropertiesManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProperties] = useDeletePropertiesMutation();
  const {
    data: allProperties,
    isLoading,
    isError,
  } = useGetAdminPropertiesQuery({
    page: currentPage,
    limit: 10,
  });
  const pagination = allProperties?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  };

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsAddDialogOpen(true);
  };

  const handleSave = (property: Property) => {
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPropertyToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (propertyToDelete) {
      console.log(propertyToDelete);
      try {
        await deleteProperties(propertyToDelete).unwrap();
        // The property list will automatically update due to RTK Query cache invalidation
        setDeleteModalOpen(false);
        setPropertyToDelete(null);
      } catch (error) {
        console.error("Failed to delete property:", error);
        setDeleteModalOpen(false);
        setPropertyToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleCancel = () => {
    setIsAddDialogOpen(false);
    setEditingProperty(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#235C47] mx-auto"></div>
          <p className="mt-4 text-[#235C47]">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error loading properties
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#235C47]">
            Properties Management
          </h1>
          <p className="text-[#235C47]/80 mt-2">Manage all property listings</p>
        </div>

        <div className="flex justify-end">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddProperty}
                className="bg-[#235C47] text-white hover:bg-[#235C47]/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border border-[#235C47]/20 bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#235C47]">
                  {editingProperty ? "Edit Property" : "Add Property"}
                </DialogTitle>
              </DialogHeader>
              <PropertyForm
                property={editingProperty || undefined}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </DialogContent>
          </Dialog>
        </div>

        <PropertyList
          properties={allProperties?.data?.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#235C47]">
              Showing{" "}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{" "}
              of {pagination.totalItems} properties
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-1">
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      // Show all pages if total pages <= 5
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Show first 5 pages if current page is in first 3
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.totalPages - 2) {
                      // Show last 5 pages if current page is in last 3
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      // Show 2 before and 2 after current page
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-[#235C47] border-[#235C47] hover:bg-[#235C47]/90"
                            : "border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="border-[#235C47] text-[#235C47] hover:bg-[#235C47]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-[#0000008a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 border border-[#235C47]/20">
            <h3 className="text-lg font-semibold text-[#235C47] mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this property? This action cannot
              be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-[#235C47] text-[#235C47] rounded-md hover:bg-[#F9F7F6] focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-[#235C47] text-white rounded-md hover:bg-[#235C47]/90 focus:outline-none focus:ring-2 focus:ring-[#235C47]/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesManagement;
