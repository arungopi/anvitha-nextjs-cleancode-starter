/**
 * @file DictionaryDataGrid.tsx
 * @description  Datagrid for Dictionary listing
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-07-04
 * @module Dictionary
 *
 */

"use client"

import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
//import { type User, fakeData, usStates } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { deleteDictionaryInfo, getDictionaryInfo, updateDictionaryInfo, createDictionaryInfo, type TDictionary as TItem} from '@/app/(home)/dictionary/create/actions';
import { languageCodes } from '@/app/lib/formMetadata';

// Component
const MaterialDataGrid = () => {

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const columns = useMemo<MRT_ColumnDef<TItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      
      {
        accessorKey: 'languageCode',
        header: 'Language Code',
        editVariant: 'select',
        editSelectOptions: languageCodes,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      }
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createTagInfo, isPending: isCreatingTagInfo } =
    useCreateItem();
  //call READ hook
  const {
    data: fetchedTagInfos = [],
    isError: isLoadingTagInfoError,
    isFetching: isFetchingTagInfo,
    isLoading: isLoadingTagInfo,
  } = useGetItem();
  //call UPDATE hook
  const { mutateAsync: updateTagInfo, isPending: isUpdatingTagInfo } =
    useUpdateItem();
  //call DELETE hook
  const { mutateAsync: deleteTagInfo, isPending: isDeletingTagInfo } =
    useDeleteItem();

  //CREATE action
  const handleCreateTagInfo: MRT_TableOptions<TItem>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateItem(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createTagInfo(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveTagInfo: MRT_TableOptions<TItem>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateItem(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateTagInfo(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<TItem>) => {
    if (window.confirm('Are you sure you want to delete this info?')) {
      deleteTagInfo(row.original.id!);
    }
  };

  const navigateToNextPage = (row: MRT_Row<TItem>) => {
    if (window.confirm('Start adding words?')) {
      //deleteTagInfo(row.original.id!);
      // TODO Navigation action
      alert(row.original.id!)
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedTagInfos,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id!,
    muiToolbarAlertBannerProps: isLoadingTagInfoError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateTagInfo,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveTagInfo,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
         <Tooltip title="Add Words">
          <IconButton color="secondary" onClick={() =>navigateToNextPage(row)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Dictionary
      </Button>
    ),
    state: {
      isLoading: isLoadingTagInfo,
      isSaving: isCreatingTagInfo || isUpdatingTagInfo || isDeletingTagInfo,
      showAlertBanner: isLoadingTagInfoError,
      showProgressBars: isFetchingTagInfo,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new item Info to api)
function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: TItem) => {
      try {
        const payload = {id : undefined, name : item.name, languageCode : item.languageCode, description : item.description}
        
        //send api update request here
        const response = await createDictionaryInfo(payload);
        if (response.status == 200) {
          return response.data as TItem[];
        } else {
          // TODO: Toast message
          throw new Error(response!.errors as string);
        }
      } catch (error) {
         console.error('Something went wrong, please retry', error);
         throw new Error('Something went wrong, please retry');
      }
    },
    //client side optimistic update
    onMutate: (newItem: TItem) => {
      queryClient.setQueryData(
        ['iteminfos'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prevItems: any) =>
          [
            ...prevItems,
            {
              ...newItem,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as TItem[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['taginfos'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get item Info from api)
function useGetItem() {
  return useQuery<TItem[]>({
    queryKey: ['iteminfos'],
    queryFn: async () => {
      //send api request here
      //await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      //return Promise.resolve(fakeData);
      try {
        const response = await getDictionaryInfo();
        if (response.status == 200) {
          return response.data as TItem[];
        } else {
          // TODO: Toast message
          throw new Error(response!.errors as string);
        }
      } catch (error) {
        console.error('Something went wrong, please retry', error)
        throw new Error('Something went wrong, please retry');
      }
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put item Info in api)
function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: TItem) => {
      try {
        //send api update request here
        const response = await updateDictionaryInfo(item.id!, item);
        if (response.status == 200) {
          return response.data as TItem[];
        } else {
          // TODO: Toast message
          throw new Error(response!.errors as string);
        }
      } catch (error) {
         console.error('Something went wrong, please retry', error);
         throw new Error('Something went wrong, please retry');
      }
      //await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
    },
    //client side optimistic update
    onMutate: (newItem: TItem) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['iteminfos'], (prevItems: any) =>
        prevItems?.map((prevItem: TItem) =>
          prevItem.id === newItem.id ? newItem : prevItem,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['taginfos'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete item Info in api)
function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      //send api update request here
      try {
        //send api update request here
        const response = await deleteDictionaryInfo(itemId);
        if (response.status == 200) {
          return response.data as TItem[];
        } else {
          // TODO: Toast message
          throw new Error(response!.errors as string);
        }
      } catch (error) {
         console.error('Something went wrong, please retry', error);
         throw new Error('Something went wrong, please retry');
      }
    },
    //client side optimistic update
    onMutate: (itemId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['iteminfos'], (prevItems: any) =>
        prevItems?.filter((item: TItem) => item.id !== itemId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['taginfos'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

export default function DictionaryDataGrid() {
  return (
    <QueryClientProvider client={queryClient}>
      <MaterialDataGrid />
      
    </QueryClientProvider>
  );
}

const validateRequired = (value: string) => !!value.length;
/*const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );*/

function validateItem(item: TItem) {
  return {
    type: !validateRequired(item.languageCode)
      ? 'Type is Required'
      : '',
    name: !validateRequired(item.name) ? 'Tag name is Required' : '',
    desc: !validateRequired(item.description) ? 'Tag description is Required' : '',
  };
}
