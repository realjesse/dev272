import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { usePaintingContext } from '@/components/ui/painting-contex-provider';
import { useNavigation } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';



const PaintingSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    artist: Yup.string().required("Artist is required"),
    year: Yup.number().required("Year is required"),
    wikipediaLink: Yup.string().url("Must be a valid URL").required("A link to the wikipedia image is requierd"),
});

const AddPainting = () => {
    const navigation = useNavigation();
    const { addPainting } = usePaintingContext();

    // TODO: use hook

    return (
        <Box className="flex-1 p-4 dark:bg-neutral-950">
            <Formik
                initialValues={{
                    name: '',
                    artist: '',
                    year: 0,
                    wikipediaLink: '',
                }}
                validationSchema={PaintingSchema}
                onSubmit={(values, { resetForm }) => {
                    // Add painting to the context
                    addPainting({
                        id: Date.now().toString(), // Generates unique ID
                        name: values.name,
                        artist: values.artist,
                        year: values.year,
                        wikipediaLink: values.wikipediaLink,
                    });

                    // Reset form
                    resetForm();
                    navigation.goBack();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <Box>
                        {/* Name Input */}
                        <Box className="mb-4">
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Name</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder='Enter painting name'
                                />
                            </Input>
                            {touched.name && errors.name && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.name}</Text>
                            )}
                        </Box>

                        {/* Artist Input */}
                        <Box className="mb-4">
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Artist</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField
                                    onChangeText={handleChange('artist')}
                                    onBlur={handleBlur('artist')}
                                    value={values.artist}
                                    placeholder='Enter artist name'
                                />
                            </Input>
                            {touched.artist && errors.artist && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.artist}</Text>
                            )}
                        </Box>

                        {/* Year Input */}
                        <Box className="mb-4">
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Year</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField
                                    onChangeText={handleChange('year')}
                                    onBlur={handleBlur('year')}
                                    value={String(values.year)}
                                    placeholder='Enter painting year'
                                />
                            </Input>
                            {touched.year && errors.year && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.year}</Text>
                            )}
                        </Box>

                        {/* Wikipedia Link Input */}
                        <Box className="mb-4">
                            <Text size='lg' className='mb-2 text-stone-900 dark:text-white'>Image Link</Text>
                            <Input variant='outline' size='md' className='bg-white dark:bg-zinc-900 mt-2'>
                                <InputField
                                    onChangeText={handleChange('wikipediaLink')}
                                    onBlur={handleBlur('wikipediaLink')}
                                    value={values.wikipediaLink}
                                    placeholder='Enter a url to the painting image'
                                />
                            </Input>
                            {touched.wikipediaLink && errors.wikipediaLink && (
                                <Text size='sm' className='text-red-500 mt-1'>{errors.wikipediaLink}</Text>
                            )}
                        </Box>

                        {/* Submit button */}
                        <Button action="positive" onPress={() => handleSubmit()} className='mt-4'>
                            <ButtonText>Submit</ButtonText>
                        </Button>
                    </Box>
                )}
            </Formik>
        </Box>
    )
}

export default AddPainting;