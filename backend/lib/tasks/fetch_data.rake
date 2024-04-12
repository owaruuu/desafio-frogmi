# lib/tasks/fetch_data.rake

desc "Fetch data from earthquake.usgs.gov API and save to database"
task :fetch_data => :environment do
  require 'net/http'
  require 'json'

  # Make a GET request to the public API
  uri = URI('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  response = Net::HTTP.get(uri)
  data = JSON.parse(response)

  data['features'].first(30).each do |item|   
    if item['properties']['title'] == nil
      puts "Elemento ignorado, 'title' no puede ser nulo"
      next
    end
    if item['properties']['url'] == nil
      puts "Elemento ignorado, 'url' no puede ser nulo"
      next
    end
    if item['properties']['place'] == nil
      puts "Elemento ignorado, 'place' no puede ser nulo"
      next
    end
    if item['properties']['magType'] == nil
      puts "Elemento ignorado, 'magType' no puede ser nulo"
      next
    end
    if item['geometry']['coordinates'] == nil
      puts "Elemento ignorado, 'coordinates' no puede ser nulo"
      next
    end
    if !item['properties']['mag'].between?(-1.0,10.0) 
      puts "Elemento ignorado, 'mag' no puede ser menor a -1.0 o mayor a 10.0"
      next
    end
    if !item["geometry"]["coordinates"][0].between?(-180.0,180.0) 
      puts "Elemento ignorado, 'longitude' no puede ser menor a -180.0 o mayor a 180.0"
      next
    end
    if !item["geometry"]["coordinates"][1].between?(-90.0,90.0) 
      puts "Elemento ignorado, 'latitude' no puede ser menor a -90.0 o mayor a 90.0"
      next
    end

    new_record_created = false

    feature = Feature.create_with(magnitude: item['properties']['mag'], place: item['properties']['place'], time: item['properties']['time'], url: item['properties']['url'], tsunami: item['properties']['tsunami'], magType: item['properties']['magType'], title: item['properties']['title'], longitude: item['geometry']['coordinates'][0], latitude: item['geometry']['coordinates'][1]).find_or_create_by(featureId: item['id']) do |feat|
      puts "Elemento agregado: #{item}"
      puts "\n"
      new_record_created = true
    end # Feature

    if new_record_created
      next  # Skip the following code if a new record was created
    end

    puts "Elemento ya existia: #{item}"     
    puts "\n"
  end # each


  puts "Data fetched from public API and saved to database successfully."
end # task
